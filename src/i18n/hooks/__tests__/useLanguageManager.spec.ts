import { renderHook, act, RenderHookResult } from '@testing-library/react'

import useLanguageManager, { DEFAULT_LOCALE } from '../useLanguageManager'

describe('useLanguageManager', () => {
  let result: RenderHookResult<
    ReturnType<typeof useLanguageManager>,
    Parameters<typeof useLanguageManager>
  >

  const renderUseLanguageManager = () => {
    result = renderHook(() => useLanguageManager())
  }

  describe('selectors', () => {
    describe('default', () => {
      beforeAll(() => {
        renderUseLanguageManager()
      })

      it('should have selectors.locale to be DEFAULT_LOCALE', () => {
        expect(result.result.current.selectors.locale).toBe(DEFAULT_LOCALE)
      })
    })
  })

  describe('actions', () => {
    describe('handleLanguageChange', () => {
      beforeAll(() => {
        renderUseLanguageManager()

        act(() => {
          // @ts-expect-error: "fr is not a supported locale, needed to provide another value than 'en'"
          result.result.current.actions.handleLanguageChange('fr')
        })
      })

      it('should have selectors.locale changed for "fr"', () => {
        expect(result.result.current.selectors.locale).toBe('fr')
      })
    })
  })
})
