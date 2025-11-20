import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { CSSProperties } from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  company,
  service,
  message,
}: ContactFormEmailProps) => {
  const serviceLabels: Record<string, string> = {
    consulting: 'Technical Consulting',
    architecture: 'System Architecture',
    leadership: 'Technical Leadership',
    fullstack: 'Full-Stack Development',
    modernization: 'System Modernization',
    fintech: 'Fintech Solutions',
    other: 'Something else',
  };

  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={headerSection}>
            <Text style={headerText}>New Message</Text>
          </Section>

          {/* Content Section */}
          <Section style={contentSection}>
            <Text style={greeting}>
              Hello,
            </Text>
            <Text style={introText}>
              You have a new contact form submission from your website.
            </Text>

            {/* Contact Details */}
            <Section style={detailsBox}>
              <Text style={fieldLabel}>From</Text>
              <Text style={fieldValue}>{name}</Text>
              <Text style={fieldEmail}>
                <Link href={`mailto:${email}`} style={emailLink}>
                  {email}
                </Link>
              </Text>

              {company && (
                <>
                  <Text style={fieldLabelSpaced}>Company</Text>
                  <Text style={fieldValue}>{company}</Text>
                </>
              )}

              <Text style={fieldLabelSpaced}>Interested In</Text>
              <Text style={fieldValue}>
                {serviceLabels[service] || service}
              </Text>
            </Section>

            {/* Message Section */}
            <Section style={messageBox}>
              <Text style={messageLabel}>Message</Text>
              <Text style={messageContent}>{message}</Text>
            </Section>

            {/* Footer */}
            <Hr style={divider} />
            <Section style={footerSection}>
              <Text style={footerText}>
                Sent from shaganplaatjies.co.za
              </Text>
              <Text style={footerSubtext}>
                © 2024 Shagan Plaatjies. All rights reserved.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Color palette from your website
const COLORS = {
  background: '#0A1619',
  surface: '#122C37',
  surfaceHover: '#1B5D66',
  accent: '#0FA3BF',
  accentLight: '#23BFDB',
  accentLighter: '#6FE4FF',
  text: '#EAEFED',
  textSecondary: '#B3B7B5',
  textMuted: '#717472',
  border: '#1B5D66',
};

const main: CSSProperties = {
  backgroundColor: COLORS.background,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  color: COLORS.text,
  lineHeight: '1.6',
};

const container: CSSProperties = {
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
};

const headerSection: CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accentLight} 100%)`,
  padding: '40px 32px',
  textAlign: 'center',
};

const headerText: CSSProperties = {
  fontSize: '32px',
  fontWeight: '700',
  margin: '0',
  color: '#ffffff',
  letterSpacing: '-0.5px',
};

const contentSection: CSSProperties = {
  backgroundColor: COLORS.surface,
  padding: '40px 32px',
  borderTop: `1px solid ${COLORS.border}`,
};

const greeting: CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  color: COLORS.text,
};

const introText: CSSProperties = {
  fontSize: '14px',
  color: COLORS.textSecondary,
  margin: '0 0 32px 0',
  lineHeight: '1.6',
};

const detailsBox: CSSProperties = {
  backgroundColor: COLORS.background,
  border: `1px solid ${COLORS.border}`,
  borderRadius: '6px',
  padding: '24px',
  marginBottom: '24px',
};

const fieldLabel: CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: COLORS.accent,
  margin: '0 0 6px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
};

const fieldLabelSpaced: CSSProperties = {
  ...fieldLabel,
  marginTop: '16px',
};

const fieldValue: CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: COLORS.text,
  margin: '0 0 12px 0',
  wordBreak: 'break-word',
};

const fieldEmail: CSSProperties = {
  fontSize: '14px',
  margin: '0 0 12px 0',
};

const emailLink: CSSProperties = {
  color: COLORS.accentLight,
  textDecoration: 'none',
  fontWeight: '500',
};

const messageBox: CSSProperties = {
  backgroundColor: COLORS.background,
  border: `1px solid ${COLORS.border}`,
  borderRadius: '6px',
  padding: '24px',
  marginBottom: '24px',
};

const messageLabel: CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: COLORS.accent,
  margin: '0 0 12px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
};

const messageContent: CSSProperties = {
  fontSize: '14px',
  color: COLORS.text,
  margin: '0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: '1.6',
};

const divider: CSSProperties = {
  borderColor: COLORS.border,
  borderWidth: '1px',
  margin: '24px 0',
  borderStyle: 'solid',
};

const footerSection: CSSProperties = {
  textAlign: 'center',
  padding: '0',
};

const footerText: CSSProperties = {
  fontSize: '12px',
  color: COLORS.textSecondary,
  margin: '0 0 4px 0',
};

const footerSubtext: CSSProperties = {
  fontSize: '11px',
  color: COLORS.textMuted,
  margin: '0',
};
