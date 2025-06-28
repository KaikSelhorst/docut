import { faker } from '@faker-js/faker'

export const constants = {
  APPLICATION_DEFAULT_USER_EMAIL: 'init-application@init.init',
  APPLICATION_DEFAULT_USER_PASSWORD: btoa(faker.finance.ethereumAddress()),
  APPLICATION_DEFAULT_USER_NAME: 'init-application'
}
