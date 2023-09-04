import { left } from '../../../shared/either'
import { InvalidEmailError } from './errors/invalidEmail'
import { InvalidNameError } from './errors/invalidName'
import { InvalidPasswordError } from './errors/invalidPassword'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid name (too few characters)', async () => {
    const name = 'O'
    const user = User.create({ name, email: 'hamilton@gmail.com', password: '1234' })
    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid name (too many characters)', () => {
    let name: string = ''
    for (let i = 0; i < 256; i++ ) {
      name += 'h'
    }
    
    const user = User.create({ name, email: 'hamilton@gmail.com', password: '123444' })

    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid name (only blank spaces)', () => {
    let name: string = '    '

    const user = User.create({ name, email: 'hamilton@gmail.com', password: '123444' })

    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid email (empity string)', () => {
    const email = ''

    const user = User.create({ name: 'Hamilton', email, password: '123456' })

    expect(user).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid name (only blank spaces)', () => {
    let email = ''

    for (let i = 0; i < 256; i++ ) {
      email += 'h'
    }

    const user = User.create({ name: 'hamilton', email, password: '1234567' })

    expect(user).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid email (outwith @)', () => {
    const email = 'hamiltongmail.com'  

    const user = User.create({ name: 'Hamilton', email, password: '1234567' })

    expect(user).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid email (outwith dot)', () => {
    const email = 'hamilton@gmailcom'

    const user = User.create({ name: 'Hamilton', email, password: '1234567' })

    expect(user).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid password (with less than six characters)', () => {
    const password = '12345'

    const user = User.create({
      name: 'Hamilton',
      email: 'hamilton@gmail.com',
      password
    })

    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create user with invalid password (more than thirty-two characters)', () => {
    let password = ''

    for (let i = 0; i < 34; i++ ) {
      password += 'h'
    }

    const user = User.create({
      name: 'Hamilton',
      email: 'hamilton@gmail.com',
      password
    })

    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })
})
