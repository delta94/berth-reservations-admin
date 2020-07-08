import React from 'react';
import { shallow } from 'enzyme';

import MapLinks, { MapLinksProps } from '../MapLinks';
import ExternalLink from '../../externalLink/ExternalLink';

describe('MapLinks', () => {
  const getWrapper = (props: MapLinksProps) => shallow(<MapLinks {...props} />);

  it('renders empty if maps is empty', () => {
    const wrapper = getWrapper({ maps: [] });

    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  it('renders consistently with a single map', () => {
    const wrapper = getWrapper({ maps: [{ id: '0', url: 'testurl' }] });

    expect(wrapper.render()).toMatchSnapshot();
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

    expect(wrapper.render()).toMatchSnapshot();
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
