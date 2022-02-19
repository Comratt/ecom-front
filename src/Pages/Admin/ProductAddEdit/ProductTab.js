import styled from 'styled-components';

export const Tabs = styled.ul`
`;

export const Tab = styled.li`
`;
export const Content = styled.div`
  ${(props) => (props.active ? '' : 'display:none')}
`;
