import React from 'react';
import Button from '../src/button';
import renderer from 'react-test-renderer';
import styles from '../src/style.js';

describe('Button', () => {
  describe('Button on load', () => {
    it('should render component', () => {
      const tree = renderer
        .create(<Button styles={styles.play} onClick={() => {}} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
