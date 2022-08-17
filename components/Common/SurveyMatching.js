import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SurveyMatching = ({ users, sections }) => {

  const oneGap = users?.one - sections?.one;
  const twoGap = users?.two - sections?.two;
  const threeGap = users?.three - sections?.three;
  const fourGap = users?.four - sections?.four;
  const fiveGap = users?.five - sections?.five;
  const sixGap = users?.six - sections?.six;
  const sevenGap = users?.seven - sections?.seven;
  const eightGap = users?.eight - sections?.eight;

  // 최대차이: 4
  // 최소차이: 0
  // 8 X 4 = 32
  // 100/32 = 3.125
  // 100 - 3.125*차이
  const gapNumber = 3.125;
  const gapSum =
    Math.abs(oneGap) * gapNumber
    + Math.abs(twoGap) * gapNumber
    + Math.abs(threeGap) * gapNumber
    + Math.abs(fourGap) * gapNumber
    + Math.abs(fiveGap) * gapNumber
    + Math.abs(sixGap) * gapNumber
    + Math.abs(sevenGap) * gapNumber
    + Math.abs(eightGap) * gapNumber

  const result = 100 - gapSum;


  return (
   result
  );
};

SurveyMatching.propTypes = {
  users: PropTypes.object,
  sections: PropTypes.object,
};

export default SurveyMatching;