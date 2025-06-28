interface LogoProps extends React.ComponentProps<'svg'> {
  size?: number
}

export function LogoFilled({ size = 24, ...props }: LogoProps) {
  return (
    <svg
      className="docut-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Docut</title>
      <rect width="32" height="32" rx="2" fill="var(--foreground)" />
      <path
        d="M19.236 26C19.6201 25.5706 19.8725 25.0398 19.9629 24.4708C20.0534 23.9018 19.9781 23.3189 19.7461 22.7916C19.5141 22.2643 19.1351 21.8149 18.6545 21.4972C18.174 21.1795 17.6121 21.0069 17.036 21"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24C20 23.2044 20.3161 22.4413 20.8787 21.8787C21.4413 21.3161 22.2044 21 23 21H24C24.5304 21 25.0391 20.7893 25.4142 20.4142C25.7893 20.0391 26 19.5304 26 19V17C26 15.9391 25.5786 14.9217 24.8284 14.1716C24.0783 13.4214 23.0609 13 22 13V8"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 17H22.01"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10C20.9391 10 19.9217 10.4214 19.1716 11.1716C18.4214 11.9217 18 12.9391 18 14C16.1435 14 14.363 14.7375 13.0503 16.0503C11.7375 17.363 11 19.1435 11 21C11 16 15 16 15 10.5C15 9.90905 14.8836 9.32389 14.6575 8.77792C14.4313 8.23196 14.0998 7.73588 13.682 7.31802C13.2641 6.90016 12.768 6.56869 12.2221 6.34254C11.6761 6.1164 11.0909 6 10.5 6C9.90905 6 9.32389 6.1164 8.77792 6.34254C8.23196 6.56869 7.73588 6.90016 7.31802 7.31802C6.90016 7.73588 6.56869 8.23196 6.34254 8.77792C6.1164 9.32389 6 9.90905 6 10.5C6 11.163 6.26339 11.7989 6.73223 12.2678C7.20107 12.7366 7.83696 13 8.5 13C9.16304 13 9.79893 12.7366 10.2678 12.2678C10.7366 11.7989 11 11.163 11 10.5C11 14 7 15 7 21C7 23.8 9.2 26 12 26H22"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ size = 24, ...props }: LogoProps) {
  return (
    <svg
      className="docut-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Docut</title>
      <path
        d="M19.236 26C19.6201 25.5706 19.8725 25.0398 19.9629 24.4708C20.0534 23.9018 19.9781 23.3189 19.7461 22.7916C19.5141 22.2643 19.1351 21.8149 18.6545 21.4972C18.174 21.1795 17.6121 21.0069 17.036 21"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24C20 23.2044 20.3161 22.4413 20.8787 21.8787C21.4413 21.3161 22.2044 21 23 21H24C24.5304 21 25.0391 20.7893 25.4142 20.4142C25.7893 20.0391 26 19.5304 26 19V17C26 15.9391 25.5786 14.9217 24.8284 14.1716C24.0783 13.4214 23.0609 13 22 13V8"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 17H22.01"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10C20.9391 10 19.9217 10.4214 19.1716 11.1716C18.4214 11.9217 18 12.9391 18 14C16.1435 14 14.363 14.7375 13.0503 16.0503C11.7375 17.363 11 19.1435 11 21C11 16 15 16 15 10.5C15 9.90905 14.8836 9.32389 14.6575 8.77792C14.4313 8.23196 14.0998 7.73588 13.682 7.31802C13.2641 6.90016 12.768 6.56869 12.2221 6.34254C11.6761 6.1164 11.0909 6 10.5 6C9.90905 6 9.32389 6.1164 8.77792 6.34254C8.23196 6.56869 7.73588 6.90016 7.31802 7.31802C6.90016 7.73588 6.56869 8.23196 6.34254 8.77792C6.1164 9.32389 6 9.90905 6 10.5C6 11.163 6.26339 11.7989 6.73223 12.2678C7.20107 12.7366 7.83696 13 8.5 13C9.16304 13 9.79893 12.7366 10.2678 12.2678C10.7366 11.7989 11 11.163 11 10.5C11 14 7 15 7 21C7 23.8 9.2 26 12 26H22"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const LogoSVGText = `<svg
      className="docut-logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Docut</title>
      <path
        d="M19.236 26C19.6201 25.5706 19.8725 25.0398 19.9629 24.4708C20.0534 23.9018 19.9781 23.3189 19.7461 22.7916C19.5141 22.2643 19.1351 21.8149 18.6545 21.4972C18.174 21.1795 17.6121 21.0069 17.036 21"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24C20 23.2044 20.3161 22.4413 20.8787 21.8787C21.4413 21.3161 22.2044 21 23 21H24C24.5304 21 25.0391 20.7893 25.4142 20.4142C25.7893 20.0391 26 19.5304 26 19V17C26 15.9391 25.5786 14.9217 24.8284 14.1716C24.0783 13.4214 23.0609 13 22 13V8"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 17H22.01"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10C20.9391 10 19.9217 10.4214 19.1716 11.1716C18.4214 11.9217 18 12.9391 18 14C16.1435 14 14.363 14.7375 13.0503 16.0503C11.7375 17.363 11 19.1435 11 21C11 16 15 16 15 10.5C15 9.90905 14.8836 9.32389 14.6575 8.77792C14.4313 8.23196 14.0998 7.73588 13.682 7.31802C13.2641 6.90016 12.768 6.56869 12.2221 6.34254C11.6761 6.1164 11.0909 6 10.5 6C9.90905 6 9.32389 6.1164 8.77792 6.34254C8.23196 6.56869 7.73588 6.90016 7.31802 7.31802C6.90016 7.73588 6.56869 8.23196 6.34254 8.77792C6.1164 9.32389 6 9.90905 6 10.5C6 11.163 6.26339 11.7989 6.73223 12.2678C7.20107 12.7366 7.83696 13 8.5 13C9.16304 13 9.79893 12.7366 10.2678 12.2678C10.7366 11.7989 11 11.163 11 10.5C11 14 7 15 7 21C7 23.8 9.2 26 12 26H22"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>`
