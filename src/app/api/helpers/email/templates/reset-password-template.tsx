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

interface ResetPasswordProps {
  userFirstname: string
  resetURL: string
}

const baseUrl = env.APP_URL ? env.APP_URL : ''

export const ResetPasswordEmailTemplate = ({
  userFirstname,
  resetURL
}: ResetPasswordProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Reset your Docut account password</Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/docut-logo.png`}
          width="40"
          height="40"
          alt="Docut"
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          You requested to reset your password for your Docut account. Click the
          button below to set a new password. If you didn’t request this, you
          can safely ignore this email.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={resetURL}>
            Reset Password
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

export function generateResetPasswordEmailTemplate(
  props: ResetPasswordProps,
  options?: Options
) {
  return render(ResetPasswordEmailTemplate(props), options)
}
