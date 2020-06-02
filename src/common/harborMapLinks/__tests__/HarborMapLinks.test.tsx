import React from 'react';
import { shallow } from 'enzyme';

import HarborMapLinks, { HarborMapLinksProps } from '../HarborMapLinks';
import ExternalLink from '../../externalLink/ExternalLink';

describe('HarborMapLinks', () => {
  const getWrapper = (props: HarborMapLinksProps) => shallow(<HarborMapLinks {...props} />);

  it('renders "null" if maps is empty', () => {
    const wrapper = getWrapper({ maps: [] });

    expect(wrapper.html()).toBeNull();
  });

  it('renders consistently with a single map', () => {
    const wrapper = getWrapper({ maps: [{ id: '0', url: 'testurl' }] });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders a single map without numbering if there is only one map', () => {
    const wrapper = getWrapper({ maps: [{ id: '0', url: 'testurl' }] });

    expect(wrapper.find(ExternalLink).render().text()).toEqual('Satamakartta (PDF)');
  });

  it('renders consistently with multiple maps', () => {
    const wrapper = getWrapper({
      maps: [
        { id: '0', url: 'testurl' },
        { id: '1', url: 'testurl' },
      ],
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders maps with numbering if there are multiple maps', () => {
    const wrapper = getWrapper({
      maps: [
        { id: '0', url: 'testurl' },
        { id: '1', url: 'testurl' },
      ],
    });

    expect(wrapper.find(ExternalLink).at(0).render().text()).toEqual('Satamakartta 1 (PDF)');
    expect(wrapper.find(ExternalLink).at(1).render().text()).toEqual('Satamakartta 2 (PDF)');
  });
});
