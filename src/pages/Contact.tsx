import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { programs } from '../data';
import { submitInquiry } from '../lib/inquiry';
import { ArrowRight, Check, Compass, Info } from '../components/Icons';
import PlaceholderNote from '../components/Placeholder';
import HelpMeChoose from '../components/HelpMeChoose';

interface FormState {
  name: string;
  email: string;
  phone: string;
  role: string;
  education: string;
  program: string;
  message: string;
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  role: '',
  education: '',
  program: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  // 'not-connected' is the honest state until submitInquiry is wired to a real channel
  const [phase, setPhase] = useState<'idle' | 'not-connected' | 'sent'>('idle');
  const [hmcOpen, setHmcOpen] = useState(false);
  useReveal();
  usePageMeta(
    'Contact — NeuroMind',
    'Get in touch with NeuroMind. Ask questions about programs, request information, or get help choosing the right technology education pathway.',
  );

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.role) e.role = 'Please select who you are.';
    if (!form.education) e.education = 'Please select your current education level.';
    if (!form.program) e.program = 'Please select a program or choose "Not sure".';
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      try {
        await submitInquiry(form);
        setPhase('sent');
      } catch {
        setPhase('not-connected');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1>Get in Touch</h1>
          <p className="hero-sub">
            Have questions about a program? Want help choosing the right pathway? Send us an
            inquiry and tell us a little about yourself.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="form-card reveal">
            {phase === 'not-connected' ? (
              <div className="form-success" role="status">
                <div className="success-icon notice" aria-hidden="true">
                  <Info size={28} />
                </div>
                <h3>Your inquiry is ready — but it has not been sent.</h3>
                <p>
                  This form is not yet connected to a live inquiry channel, so nothing you entered
                  was transmitted or stored. It will be connected before launch.
                </p>
                <div className="inquiry-summary">
                  <div>
                    <b>Name</b> {form.name}
                  </div>
                  <div>
                    <b>Program of interest</b>{' '}
                    {programs.find((p) => p.slug === form.program)?.shortTitle ?? 'Not sure yet'}
                  </div>
                </div>
                <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setPhase('idle');
                      window.scrollTo({ top: 0, behavior: 'auto' });
                    }}
                  >
                    Edit My Inquiry
                  </button>
                  <button className="btn btn-secondary" onClick={() => setHmcOpen(true)}>
                    <Compass /> Help Me Choose
                  </button>
                  <Link to="/programs" className="btn btn-secondary">
                    Explore Programs <ArrowRight />
                  </Link>
                </div>
              </div>
            ) : phase === 'sent' ? (
              <div className="form-success" role="status">
                <div className="success-icon" aria-hidden="true">
                  <Check size={28} />
                </div>
                <h3>Thank you. Your inquiry has been received.</h3>
                <p>We appreciate your interest in NeuroMind.</p>
                <div style={{ marginTop: 28 }}>
                  <Link to="/programs" className="btn btn-primary">
                    Explore Programs <ArrowRight />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="form-preview-badge">
                  <Info size={13} /> Preview — not connected
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 6 }}>Program Inquiry</h2>
                <p style={{ color: 'var(--ink-3)', marginBottom: 16, fontSize: '0.9375rem' }}>
                  For students and parents with questions about programs. Fields marked with{' '}
                  <span className="req" style={{ color: '#dc2626' }}>*</span> are required; all
                  others are optional.
                </p>
                <div style={{ marginBottom: 24 }}>
                  <PlaceholderNote label="Before this form goes live">
                    This inquiry form is not connected to a live channel yet — nothing entered here
                    is sent or stored. It will be wired up before launch.
                  </PlaceholderNote>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="c-name">
                      Full Name <span className="req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'c-name-err' : undefined}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                    {errors.name && <span className="form-error" id="c-name-err">{errors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="c-email">
                      Email Address <span className="req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'c-email-err' : undefined}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && <span className="form-error" id="c-email-err">{errors.email}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="c-phone">Phone Number (optional)</label>
                    <input
                      id="c-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="+91 00000 00000"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      I am a… <span className="req" aria-hidden="true">*</span>
                    </label>
                    <div className="radio-group" role="radiogroup" aria-label="I am a">
                      {['Student', 'Parent', 'Other'].map((opt) => (
                        <label key={opt} className={`radio-pill${form.role === opt ? ' checked' : ''}`}>
                          <input
                            type="radio"
                            name="role"
                            value={opt}
                            checked={form.role === opt}
                            onChange={() => set('role', opt)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.role && <span className="form-error">{errors.role}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="c-education">
                      Current Education Level <span className="req" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="c-education"
                      value={form.education}
                      onChange={(e) => set('education', e.target.value)}
                      aria-invalid={errors.education ? 'true' : undefined}
                      aria-describedby={errors.education ? 'c-edu-err' : undefined}
                    >
                      <option value="">Select education level</option>
                      <option value="standard-8">Standard 8</option>
                      <option value="standard-9">Standard 9</option>
                      <option value="class-10">Class 10</option>
                      <option value="class-11-12">Class 11–12</option>
                      <option value="higher">Higher education</option>
                      <option value="professional">Working professional</option>
                    </select>
                    {errors.education && <span className="form-error" id="c-edu-err">{errors.education}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="c-program">
                      Program of Interest <span className="req" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="c-program"
                      value={form.program}
                      onChange={(e) => set('program', e.target.value)}
                      aria-invalid={errors.program ? 'true' : undefined}
                      aria-describedby={errors.program ? 'c-prog-err' : undefined}
                    >
                      <option value="">Select a program</option>
                      {programs.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.shortTitle}
                        </option>
                      ))}
                      <option value="not-sure">Not sure yet</option>
                    </select>
                    {errors.program && <span className="form-error" id="c-prog-err">{errors.program}</span>}
                  </div>

                  <div className="form-field full">
                    <label htmlFor="c-message">Message (optional)</label>
                    <textarea
                      id="c-message"
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Tell us what you'd like to know — questions about programs, admissions, curriculum, or anything else."
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 28,
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <button type="submit" className="btn btn-primary btn-lg">
                    Review My Inquiry <ArrowRight />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setHmcOpen(true)}
                  >
                    <Compass /> Not sure which program?
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight bg-soft">
        <div className="container container-narrow">
          <div className="grid-2 reveal" style={{ gap: 20 }}>
            <div className="card">
              <h3 style={{ fontSize: '1.0625rem', marginBottom: 8 }}>For Students</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
                Curious about what you will learn, build or achieve in a program? Ask us anything —
                from curriculum details to weekly commitments.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.0625rem', marginBottom: 8 }}>For Parents</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
                Want to understand program structure, assessments, certification preparation or
                learning outcomes? We are happy to provide clear, detailed answers.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <PlaceholderNote label="Contact details — not yet published">
              A phone number and email address will be published here once NeuroMind confirms
              them.
            </PlaceholderNote>
          </div>
        </div>
      </section>
      <div style={{ height: 32 }} />

      <HelpMeChoose open={hmcOpen} onClose={() => setHmcOpen(false)} />
    </>
  );
}
