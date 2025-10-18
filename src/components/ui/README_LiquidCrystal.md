# Liquid Crystal Background Component

Анимированный WebGL2 фон с эффектом жидких кристаллов в индиго/фиолетовой цветовой гамме.

## Использование

```jsx
import { LiquidCrystalBackground } from './components/ui/LiquidCrystalBackground';

<LiquidCrystalBackground
  speed={0.4}
  radii={[0.25, 0.18, 0.3]}
  smoothK={[0.25, 0.3]}
  className="custom-class"
/>
```

## Props

- **speed** (number, default: 0.5): Скорость анимации
- **radii** (array, default: [0.2, 0.15, 0.22]): Радиусы трех blob-объектов
- **smoothK** (array, default: [0.2, 0.25]): Параметры плавного объединения форм
- **className** (string): Дополнительные CSS классы

## Технические детали

- Использует WebGL2 и GLSL шейдеры
- Цветовая палитра настроена на индиго/фиолетовые тона (соответствует --primary: #4E3AFB)
- Автоматически адаптируется к размеру контейнера
- Оптимизирован для работы на всех устройствах с поддержкой WebGL2

## Интеграция в Hero Section

Компонент интегрирован в Hero секцию с:
- Прозрачностью 0.25
- Blur эффектом 40px для мягкого свечения
- Slight scale для лучшего покрытия

## Fallback

Если WebGL2 не поддерживается, показывается сообщение об ошибке.

