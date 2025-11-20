import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
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
          <Section style={box}>
            <Text style={heading}>New Contact Form Submission</Text>
            <Hr style={hr} />

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Name</Text>
              <Text style={fieldValue}>{name}</Text>
            </Row>

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Email</Text>
              <Link href={`mailto:${email}`} style={fieldValue}>
                {email}
              </Link>
            </Row>

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Company</Text>
              <Text style={fieldValue}>{company || 'Not provided'}</Text>
            </Row>

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Service Interest</Text>
              <Text style={fieldValue}>
                {serviceLabels[service] || service}
              </Text>
            </Row>

            <Hr style={hr} />

            <Text style={messageLabel}>Message</Text>
            <Text style={messageContent}>{message}</Text>

            <Hr style={hr} />
            <Text style={footer}>
              This email was sent from shaganplaatjies.co.za contact form
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main: CSSProperties = {
  backgroundColor: '#f3f3f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container: CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box: CSSProperties = {
  padding: '0 48px',
};

const heading: CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  margin: '16px 0',
  padding: '0',
  color: '#1a1a1a',
};

const hr: CSSProperties = {
  borderColor: '#e5e5e5',
  margin: '20px 0',
};

const fieldRow: CSSProperties = {
  marginBottom: '16px',
};

const fieldLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#666666',
  margin: '0 0 4px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const fieldValue: CSSProperties = {
  fontSize: '14px',
  color: '#1a1a1a',
  margin: '0',
};

const messageLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#666666',
  margin: '0 0 8px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const messageContent: CSSProperties = {
  fontSize: '14px',
  color: '#1a1a1a',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap',
};

const footer: CSSProperties = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '0',
};
