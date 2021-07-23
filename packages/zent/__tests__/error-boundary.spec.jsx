import { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ErrorBoundary from '../src/error-boundary';

Enzyme.configure({ adapter: new Adapter() });

class ErrorComponent extends Component {
  render() {
    throw new Error('This is an error from render.');

    // eslint-disable-next-line
    return <div className="this-will-not-render" />;
  }
}

class CustomFallback extends Component {
  render() {
    return <div className="custom-fallback-component" />;
  }
}

describe('ErrorBoundary', () => {
  it('catches errors in child components', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(wrapper.find('.this-will-not-render').length).toBe(0);
    expect(wrapper.find('.zent-error-boundary-fallback-component').length).toBe(
      1
    );
  });

  it('can customize fallback component', () => {
    const wrapper = mount(
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(wrapper.find('.custom-fallback-component').length).toBe(1);
  });

  it('can have onError callback', () => {
    const onError = jest.fn();
    mount(
      <ErrorBoundary onError={onError}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(onError.mock.calls.length).toBe(1);
  });

  it('has an HOC withErrorBoundary', () => {
    const onError = jest.fn();
    const HOC = ErrorBoundary.withErrorBoundary({
      Component: ErrorComponent,
      FallbackComponent: CustomFallback,
      onError,
    });

    const wrapper = mount(<HOC />);

    expect(onError.mock.calls.length).toBe(1);
    expect(wrapper.find('.custom-fallback-component').length).toBe(1);
  });

  it('has an HOC catchError', () => {
    const onError = jest.fn();

    const HOC = ErrorBoundary.catchError({
      FallbackComponent: CustomFallback,
      onError,
    })(ErrorComponent);
    let wrapper = mount(<HOC />);
    expect(onError.mock.calls.length).toBe(1);
    expect(wrapper.find('.custom-fallback-component').length).toBe(1);

    const HOCWithDefaultOptions = ErrorBoundary.catchError()(ErrorComponent);
    wrapper = mount(<HOCWithDefaultOptions />);
    expect(onError.mock.calls.length).toBe(1);
    expect(wrapper.find('.custom-fallback-component').length).toBe(0);
    expect(wrapper.find('.zent-error-boundary-fallback-component').length).toBe(
      1
    );
  });
});
