import{ useAuth, AuthProvider } from '../../hooks/useAuth';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe ('Auth hook', () => {
  it('should be able to login', async() => {
    const apiResponse = {user: {
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      token: 'token-123',
    };

    apiMock.onPost('session').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.login({
      email: 'john.doe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoFinance:token', apiResponse.token);
    expect(setItemSpy).toHaveBeenCalledWith('@GoFinance:user', JSON.stringify(apiResponse.user));
    expect(result.current.user.email).toEqual('john.doe@example.com');

  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch(key) {
        case '@GoFinance:token':
          return 'token-123';
        case '@GoFinance:user':
          return JSON.stringify({
            id: 'user123',
            name: 'John Doe',
            email: 'john.doe@example.com',
          });
        default:
          return null;
      }
    });

    const {result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('john.doe@example.com');
  });

  it('should be able to logout', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch(key) {
        case '@GoFinance:token':
          return 'token-123';
        case '@GoFinance:user':
          return JSON.stringify({
            id: 'user123',
            name: 'John Doe',
            email: 'john.doe@example.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const {result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.logout();
    })

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });
});
