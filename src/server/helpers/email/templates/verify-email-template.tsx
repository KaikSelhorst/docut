import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text
} from '@react-email/components'

import { type Options, render } from '@react-email/render'
import { env } from 'shared/env'

interface VerifyEmailProps {
  userFirstname: string
  confirmURL: string
}

const baseUrl = env.BETTER_AUTH_URL ? `https://${env.BETTER_AUTH_URL}` : ''

export const VerifyEmailTemplate = ({
  userFirstname,
  confirmURL
}: VerifyEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/docut-logo.png`}
          width="40"
          height="40"
          alt="Docut"
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Docut, the link management platform that helps you build
          stronger digital connections. Create short URLs, generate QR codes,
          and track engagement to connect your audience with the right content.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={confirmURL}>
            Confirm account
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px'
}

const paragraph = {
  fontSize: '14px',
  lineHeight: '24px'
}

const btnContainer = {
  textAlign: 'center' as const
}

const button = {
  backgroundColor: '#000000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '14px',
  textDecoration: 'none',
  fontWeight: '600',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px'
}

export function generateVerifyEmailTemplate(
  props: VerifyEmailProps,
  options?: Options
) {
  return render(VerifyEmailTemplate(props), options)
}
