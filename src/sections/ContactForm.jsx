import { useRef, useState } from 'react'
import Button from '../components/ui/Button'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY = { name: '', email: '', subject: '', message: '', _gotcha: '' }

function validate({ name, email, message }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Indiquez votre nom (2 caractères minimum).'
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Indiquez une adresse e-mail valide.'
  if (message.trim().length < 10) errors.message = 'Votre message doit contenir au moins 10 caractères.'
  return errors
}

const inputClass = (hasError) =>
  `w-full rounded-md border bg-night px-3.5 py-3.5 text-[15px] text-text transition-colors focus:border-orange ${
    hasError ? 'border-danger' : 'border-line'
  }`

function Field({ id, label, optional, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs text-muted">
        {label}
        {optional && ' (facultatif)'}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm({ endpoint }) {
  const formRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: inputClass(Boolean(errors[name])),
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    if (values._gotcha) {
      setStatus('success') // robot : on feint le succès sans rien envoyer
      return
    }

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }

    setStatus('sending')
    setServerError('')
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: values.subject.trim() || 'Nouveau message depuis le portfolio',
        }),
        signal: controller.signal,
      })
      if (res.ok) {
        setValues(EMPTY)
        setStatus('success')
      } else {
        setServerError('Le message n’a pas pu être envoyé. Réessayez dans un instant.')
        setStatus('error')
      }
    } catch {
      setServerError(
        navigator.onLine
          ? 'Le service ne répond pas. Réessayez dans un instant.'
          : 'Connexion indisponible. Vérifiez votre réseau puis réessayez.',
      )
      setStatus('error')
    } finally {
      clearTimeout(timer)
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-6 sm:p-8">
        <p className="font-display text-2xl font-bold text-ok">Message envoyé</p>
        <p className="text-muted">Merci pour votre message.</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nom" error={errors.name}>
          <input type="text" autoComplete="name" aria-required="true" {...fieldProps('name')} />
        </Field>
        <Field id="email" label="Adresse e-mail" error={errors.email}>
          <input type="email" autoComplete="email" aria-required="true" {...fieldProps('email')} />
        </Field>
      </div>

      <Field id="subject" label="Sujet" optional>
        <input type="text" maxLength={120} {...fieldProps('subject')} />
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea rows={5} maxLength={2000} aria-required="true" {...fieldProps('message')} />
      </Field>

      {/* Champ piège anti-robots : invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="_gotcha">Ne pas remplir</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={onChange} />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-danger">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={sending} className="self-start disabled:cursor-not-allowed disabled:opacity-60">
        {sending && (
          <span aria-hidden="true" className="size-4 rounded-full border-2 border-on-orange/40 border-t-on-orange motion-safe:animate-spin" />
        )}
        {sending ? 'Envoi en cours…' : 'Envoyer le message'}
      </Button>
    </form>
  )
}