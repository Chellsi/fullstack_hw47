# 📝 React Registration Form

Сучасна форма реєстрації, побудована на React + TypeScript з потужною валідацією та стилізацією Tailwind CSS.

## 🚀 Особливості

- ✅ **TypeScript** - повна типізація для безпеки коду
- ✅ **Formik** - потужне керування станом форми
- ✅ **Yup валідація** - схеми валідації з українською локалізацією
- ✅ **Tailwind CSS** - сучасний responsive дизайн
- ✅ **Емодзі іконки** - без додаткових залежностей
- ✅ **UX/UI** - інтерактивні елементи та анімації
- ✅ **Accessibility** - семантична розмітка

## 🛠 Технології

| Технологія | Версія | Опис |
|-----------|--------|------|
| React | ^18.2.0 | UI бібліотека |
| TypeScript | ^5.2.2 | Статична типізація |
| Formik | ^2.4.5 | Керування формами |
| Yup | ^1.4.0 | Схеми валідації |
| Tailwind CSS | ^3.4.0 | CSS фреймворк |
| Vite | ^5.0.8 | Збірщик проекту |

## 📁 Структура проекту

```
my-react-app/
├── src/
│   ├── components/
│   │   └── Form.tsx          # Головна форма з валідацією
│   ├── App.tsx               # Головний компонент
│   ├── main.tsx              # Точка входу
│   └── index.css             # Tailwind стилі
├── tailwind.config.js        # Конфігурація Tailwind
├── postcss.config.js         # PostCSS конфігурація
├── tsconfig.json             # TypeScript конфігурація
├── package.json              # Залежності проекту
└── README.md                 # Документація
```

## 🚀 Швидкий старт

### 1. Клонування репозиторію
```bash
git clone <repository-url>
cd my-react-app
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Запуск проекту
```bash
npm run dev
```

### 4. Відкрити в браузері
```
http://localhost:5173
```

## 📋 Поля форми

| Поле | Тип | Валідація | Опис |
|------|-----|-----------|------|
| **Ім'я** | text | 2-50 символів, обов'язкове | Ім'я користувача |
| **Прізвище** | text | 2-50 символів, обов'язкове | Прізвище користувача |
| **Email** | email | формат email, обов'язкове | Електронна пошта |
| **Пароль** | password | 8+ символів, складність | Мін. 1 велика, 1 мала літера, 1 цифра |
| **Підтвердження** | password | співпадіння з паролем | Підтвердження паролю |
| **Телефон** | tel | формат телефону | Номер телефону |
| **Дата народження** | date | не в майбутньому | Дата народження |
| **Згода** | checkbox | обов'язкове | Прийняття умов |

## 🎨 Дизайн система

### Кольори
- **Primary**: Indigo (600, 700, 500)
- **Success**: Green (50, 200, 500, 700, 800)
- **Error**: Red (50, 200, 500)
- **Neutral**: Gray (300, 400, 600, 700, 900)

### Компоненти
- **Градієнтний фон**: `from-blue-50 to-indigo-100`
- **Картка форми**: білий фон, rounded-xl, shadow-lg
- **Поля вводу**: border, rounded-lg, focus ring
- **Кнопка**: indigo фон, hover ефект, disabled стан

## 🧪 Валідація

### Правила валідації (Yup схема):

```typescript
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .max(50, 'Максимум 50 символів')
    .required('Обов\'язкове поле'),
  
  email: Yup.string()
    .email('Невірний формат email')
    .required('Обов\'язкове поле'),
  
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Складність паролю')
    .required('Обов\'язкове поле'),
  
  // ... інші поля
});
```

## 🔧 Налаштування

### Tailwind CSS
```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### TypeScript конфігурація
```json
{
  "compilerOptions": {
    "strict": true,
    "verbatimModuleSyntax": true,
    "jsx": "react-jsx"
  }
}
```

## 📱 Адаптивність

Форма повністю адаптивна завдяки Tailwind CSS:
- **Mobile**: одноколонковий layout
- **Desktop**: двоколонковий grid для імені/прізвища
- **Flexbox** для вирівнювання елементів

## 🎯 UX особливості

### Інтерактивність
- ⚡ **Realtime валідація** - під час введення
- 🎨 **Візуальні індикатори** - червоні рамки для помилок  
- 💫 **Hover ефекти** - для кнопок та посилань
- ⏳ **Loading стан** - анімація під час відправки

### Feedback
- ✅ **Повідомлення про успіх** - після відправки
- ❌ **Помилки валідації** - біля кожного поля
- 🔄 **Auto-hide** - приховування повідомлень через 5с

## 🧩 Компоненти

### Головні компоненти:
```typescript
// Головна форма
const RegistrationForm: React.FC = () => { ... }

// Переиспользуемое поле
const FormField: React.FC<FormFieldProps> = ({ ... }) => { ... }

// Компонент іконки
const Icon: React.FC<{ name: string }> = ({ ... }) => { ... }
```

### Типізація:
```typescript
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthDate: string;
  terms: boolean;
}
```

## 📚 Скрипти

```json
{
  "scripts": {
    "dev": "vite",           // Запуск dev сервера
    "build": "vite build",   // Збірка для продакшну
    "preview": "vite preview", // Перегляд збірки
    "lint": "eslint . --ext ts,tsx" // Лінтинг коду
  }
}
```

## 🚀 Деплой

### Збірка проекту:
```bash
npm run build
```

### Перегляд збірки:
```bash
npm run preview
```

## 🛡 Безпека

- ✅ **Client-side валідація** - перша лінія захисту
- ✅ **TypeScript** - запобігає помилкам типізації
- ✅ **Санітизація даних** - очищення введених даних
- ⚠️ **Server-side валідація** - потрібна на backend

## 🤝 Внесок

1. Fork проекту
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add AmazingFeature'`)
4. Push до branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

Цей проект ліцензовано під MIT License.

---

⭐ **Поставте зірку, якщо проект був корисним!**