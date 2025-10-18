import React, { useRef, useEffect, useState } from 'react';
import './LiquidCrystalBackground.css';

export const liquidCrystalShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_speed;
uniform vec3 u_radii;
uniform vec2 u_smoothK;
out vec4 fragColor;

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float opSmoothUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

float mapScene(vec2 uv) {
  float t = u_time * u_speed;
  vec2 p1 = vec2(cos(t * 0.5), sin(t * 0.5)) * 0.3;
  vec2 p2 = vec2(cos(t * 0.7 + 2.1), sin(t * 0.6 + 2.1)) * 0.4;
  vec2 p3 = vec2(cos(t * 0.4 + 4.2), sin(t * 0.8 + 4.2)) * 0.35;

  float b1 = sdCircle(uv - p1, u_radii.x);
  float b2 = sdCircle(uv - p2, u_radii.y);
  float b3 = sdCircle(uv - p3, u_radii.z);

  float u12 = opSmoothUnion(b1, b2, u_smoothK.x);
  return opSmoothUnion(u12, b3, u_smoothK.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float d = mapScene(uv);

  // Indigo/Purple color palette - more vibrant
  vec3 base = vec3(0.025 / abs(d));
  
  // Create shifting indigo/violet colors
  float t = u_time * 0.2;
  vec3 color1 = vec3(0.31, 0.23, 0.98); // Bright indigo #4E3AFB
  vec3 color2 = vec3(0.55, 0.27, 0.91); // Purple
  vec3 color3 = vec3(0.24, 0.14, 0.88); // Deep indigo
  
  // Create color animation
  vec3 pha = 0.5 + 0.5 * cos(t + uv.xyx + vec3(0.0, 2.0, 4.0));
  vec3 palette = mix(color1, color2, pha.x);
  palette = mix(palette, color3, pha.y * 0.5);
  
  vec3 col = base * palette;
  col = clamp(col, 0.0, 1.0);
  
  // Add subtle glow
  col = pow(col, vec3(0.8));
  
  fragColor = vec4(col, 1.0);
}
`;

/**
 * LiquidCrystalBackground Component
 * Renders an animated WebGL2 liquid crystal effect with metaballs
 * Uses GPU-accelerated shaders for smooth 60fps performance
 * 
 * @param {number} speed - Animation speed multiplier (default: 0.5)
 * @param {number[]} radii - Array of 3 circle radii for metaballs (default: [0.2, 0.15, 0.22])
 * @param {number[]} smoothK - Array of 2 smoothing factors for blending (default: [0.2, 0.25])
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} WebGL canvas with animated liquid crystal effect
 */
const LiquidCrystalBackgroundComponent = ({
  speed = 0.5,
  radii = [0.2, 0.15, 0.22],
  smoothK = [0.2, 0.25],
  className = ''
}) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      setError('WebGL2 not supported');
      return;
    }

    class Renderer {
      constructor() {
        const compile = (type, src) => {
          const s = gl.createShader(type);
          gl.shaderSource(s, src);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(s));
            gl.deleteShader(s);
            return null;
          }
          return s;
        };

        const vsSrc = `#version 300 es
        in vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }`;
        const vs = compile(gl.VERTEX_SHADER, vsSrc);
        const fs = compile(gl.FRAGMENT_SHADER, liquidCrystalShader);

        this.prog = gl.createProgram();
        gl.attachShader(this.prog, vs);
        gl.attachShader(this.prog, fs);
        gl.linkProgram(this.prog);
        if (!gl.getProgramParameter(this.prog, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(this.prog));
        }

        const quadVerts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
        this.buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
        gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(this.prog, 'position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        this.uRes = gl.getUniformLocation(this.prog, 'u_resolution');
        this.uTime = gl.getUniformLocation(this.prog, 'u_time');
        this.uSpeed = gl.getUniformLocation(this.prog, 'u_speed');
        this.uRadii = gl.getUniformLocation(this.prog, 'u_radii');
        this.uK = gl.getUniformLocation(this.prog, 'u_smoothK');
      }

      render(timeMs) {
        const w = gl.canvas.width;
        const h = gl.canvas.height;
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.prog);
        gl.uniform2f(this.uRes, w, h);
        gl.uniform1f(this.uTime, timeMs * 0.001);
        gl.uniform1f(this.uSpeed, speed);
        gl.uniform3fv(this.uRadii, radii);
        gl.uniform2fv(this.uK, smoothK);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    const renderer = new Renderer();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    window.addEventListener('resize', resize);
    resize();

    let rafId;
    const animate = (t) => {
      renderer.render(t);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [speed, radii, smoothK]);

  return (
    <div className={`liquid-crystal-container ${className}`}>
      <canvas ref={canvasRef} className="liquid-crystal-canvas" />
      {error && (
        <div className="liquid-crystal-error">
          {error}
        </div>
      )}
    </div>
  );
};

/**
 * Memoized version to prevent unnecessary re-renders
 * Only re-renders when speed, radii, smoothK, or className props change
 */
export const LiquidCrystalBackground = React.memo(LiquidCrystalBackgroundComponent);

