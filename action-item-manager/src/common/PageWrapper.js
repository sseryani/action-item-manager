import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 20px;
    width: 100%;
`;

class PageWrapper extends React.Component {
    render() {
        return <Wrapper>{this.props.children}</Wrapper>;
    }
}

export default PageWrapper;
