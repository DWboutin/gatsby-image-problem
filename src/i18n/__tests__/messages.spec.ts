import messages from '../messages'

describe('INTL messages', () => {
  it('should match snapshot', () => {
    expect(JSON.stringify(messages)).toMatchSnapshot()
  })
})
