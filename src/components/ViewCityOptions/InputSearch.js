import styled from 'styled-components';

const InputSearch = styled.input.attrs(props => {
  type: props.type;
  autoComplete: props.autoComplete;
})`
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 22px;
  font-size: 14px;
  transition: width 0.15s;
  appearance: none;
  box-sizing: border-box;
  padding: 14px 0;
  background: 0 0;
  outline: 0;
  border: none;
  color: #333;
  &::placeholder {
    color: #fff;
  }
  &:focus {
    width: 100px;
  }
`;

export default InputSearch;
