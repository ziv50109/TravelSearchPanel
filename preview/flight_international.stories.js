import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/flight/international/mobile';
import FlightInternationalPC from '../src/flight/international/pc';

class Pc extends PureComponent {
    state = { show: 0 };
    render = () => <FlightInternationalPC emitRtow={(show) => this.setState({ show })} rtow={this.state.show} />;
}

storiesOf('國際機票', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));