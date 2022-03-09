import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PropertyModal from './PropertyModal';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import '../../../utils/matchMedia';
Enzyme.configure({ adapter: new Adapter() });

describe('test input', () => {
  it('test address input and output', async () => {
    const { getAllByTestId } = render(<PropertyModal visible={true} />);
    const input = await getAllByTestId('address')[0];
    await act(async () => {
      fireEvent.change(input, { target: { value: '66 hope street' } });
    });
    expect(input.value).toBe('66 hope street');
  });

  it('test valuation input and output', async () => {
    const { getAllByTestId } = render(<PropertyModal visible={true} />);
    const input = await getAllByTestId('valuation')[0];
    await act(async () => {
      fireEvent.change(input, { target: { value: 456444 } });
    });
    expect(input.value).toBe('$ 456,444');
  });

  it('test address and valuation input and output together', async () => {
    const { getAllByTestId } = render(<PropertyModal visible={true} />);
    const inputAddress = await getAllByTestId('address')[0];
    const inputValuation = await getAllByTestId('valuation')[0];
    await act(async () => {
      fireEvent.change(inputAddress, { target: { value: '66 hope street' } });
      fireEvent.change(inputValuation, { target: { value: 456444 } });
    });
    expect(inputAddress.value).toBe('66 hope street');
    expect(inputValuation.value).toBe('$ 456,444');
  });
});
