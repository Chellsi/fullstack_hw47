import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock, Phone, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';

// Інтерфейс для значень форми
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

// Схема валідації з використанням Yup
const validationSchema: Yup.Schema<FormValues> = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Ім\'я повинно містити щонайменше 2 символи')
    .max(50, 'Ім\'я не може перевищувати 50 символів')
    .required('Ім\'я є обов\'язковим'),
  lastName: Yup.string()
    .min(2, 'Прізвище повинно містити щонайменше 2 символи')
    .max(50, 'Прізвище не може перевищувати 50 символів')
    .required('Прізвище є обов\'язковим'),
  email: Yup.string()
    .email('Невірний формат електронної пошти')
    .required('Електронна пошта є обов\'язковою'),
  password: Yup.string()
    .min(8, 'Пароль повинен містити щонайменше 8 символів')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль повинен містити принаймні одну велику літеру, одну малу літеру та одну цифру')
    .required('Пароль є обов\'язковим'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження паролю є обов\'язковим'),
  phone: Yup.string()
    .matches(/^[\+]?[0-9\s\-\(\)]{10,}$/, 'Невірний формат номера телефону')
    .required('Номер телефону є обов\'язковим'),
  birthDate: Yup.string()
    .required('Дата народження є обов\'язковою')
    .test('age', 'Дата народження не може бути в майбутньому', function(value) {
      return value ? new Date(value) <= new Date() : false;
    }),
  terms: Yup.boolean()
    .oneOf([true], 'Необхідно прийняти умови користування')
    .required('Необхідно прийняти умови користування')
});

// Початкові значення форми
const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthDate: '',
  terms: false
};

// Інтерфейс для пропсів поля вводу
interface FormFieldProps {
  name: keyof FormValues;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  label: string;
  errors: any;
  touched: any;
  className?: string;
}

// Компонент поля вводу
const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  placeholder,
  icon,
  label,
  errors,
  touched,
  className = ""
}) => (
  <div className={className}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <Field
        id={name}
        name={name}
        type={type}
        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errors[name] && touched[name] 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />
      <div className="absolute left-3 top-2.5">
        {icon}
      </div>
    </div>
    <ErrorMessage name={name}>
      {(msg: string) => (
        <div className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {msg}
        </div>
      )}
    </ErrorMessage>
  </div>
);

const RegistrationForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionData, setSubmissionData] = useState<FormValues | null>(null);

  // Обробник відправлення форми
  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      // Імітація відправки даних на сервер
      console.log('Дані форми:', values);
      
      // Симуляція затримки мережі
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тут би була логіка відправки на сервер, якщо б в нас був сервер ахаха
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      
      setSubmissionData(values);
      setIsSubmitted(true);
      resetForm();
      
      // Автоматично приховати повідомлення про успіх через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmissionData(null);
      }, 5000);
      
    } catch (error) {
      console.error('Помилка відправки форми:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Реєстрація</h2>
          <p className="text-gray-600 mt-2">Створіть новий акаунт</p>
        </div>

        {/* Повідомлення про успішну відправку */}
        {isSubmitted && submissionData && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <h3 className="font-medium text-green-800">Форму успішно відправлено!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Дані користувача {submissionData.firstName} {submissionData.lastName} збережено
                </p>
              </div>
            </div>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, handleSubmit: formikSubmit }) => (
            <div className="space-y-6">
              {/* Ім'я та Прізвище */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="firstName"
                  type="text"
                  placeholder="Введіть ім'я"
                  icon={<User className="h-4 w-4 text-gray-400" />}
                  label="Ім'я"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  name="lastName"
                  type="text"
                  placeholder="Введіть прізвище"
                  icon={<User className="h-4 w-4 text-gray-400" />}
                  label="Прізвище"
                  errors={errors}
                  touched={touched}
                />
              </div>

              {/* Електронна пошта */}
              <FormField
                name="email"
                type="email"
                placeholder="example@email.com"
                icon={<Mail className="h-4 w-4 text-gray-400" />}
                label="Електронна пошта"
                errors={errors}
                touched={touched}
              />

              {/* Пароль */}
              <FormField
                name="password"
                type="password"
                placeholder="Введіть пароль"
                icon={<Lock className="h-4 w-4 text-gray-400" />}
                label="Пароль"
                errors={errors}
                touched={touched}
              />

              {/* Підтвердження паролю */}
              <FormField
                name="confirmPassword"
                type="password"
                placeholder="Підтвердіть пароль"
                icon={<Lock className="h-4 w-4 text-gray-400" />}
                label="Підтвердіть пароль"
                errors={errors}
                touched={touched}
              />

              {/* Номер телефону */}
              <FormField
                name="phone"
                type="tel"
                placeholder="+38 (050) 123-45-67"
                icon={<Phone className="h-4 w-4 text-gray-400" />}
                label="Номер телефону"
                errors={errors}
                touched={touched}
              />

              {/* Дата народження */}
              <FormField
                name="birthDate"
                type="date"
                placeholder=""
                icon={<Calendar className="h-4 w-4 text-gray-400" />}
                label="Дата народження"
                errors={errors}
                touched={touched}
              />

              {/* Чекбокс згода з умовами */}
              <div className="flex items-start">
                <Field
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  Я погоджуюсь з{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500 underline">
                    умовами користування
                  </a>{' '}
                  та{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500 underline">
                    політикою конфіденційності
                  </a>
                </label>
              </div>
              <ErrorMessage name="terms">
                {(msg: string) => (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {msg}
                  </div>
                )}
              </ErrorMessage>

              {/* Кнопка відправки */}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  formikSubmit();
                }}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Обробка...' : 'Зареєструватися'}
              </button>
            </div>
          )}
        </Formik>

        {/* Додаткова інформація */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Уже маєте акаунт?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Увійти
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;