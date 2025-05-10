"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const [status, setStatus] = useState('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus('En transit...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('Message envoyé, merci!');
        reset();
      } else {
        setStatus('Message non envoyé.');
      }
    } catch (error) {
      setStatus('Erreur lors de l\'envoi du message.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
        <label>nom</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-600 mb-2">{errors.name.message}</p>}
       </div>
      <div>
        <label>email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
       />
        
      {errors.email && <p className="text-red-600 mb-2">{errors.email.message}</p>}
      </div>
      </div>
      <div>
        <label>message</label>
      <textarea
        rows={12}
        {...register('message', { required: 'Message is required' })}
        className="block w-full mb-2 p-2 border rounded"
      />
      {errors.message && <p className="text-red-600 mb-2">{errors.message.message}</p>}
      </div>
        <div>
      <button
        type="submit" className="valider"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'VALIDER'}
      </button>

      <p className="message-envoye">{status}</p>
      </div>
    </form>
  );
}
