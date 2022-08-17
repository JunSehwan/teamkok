import { Picker } from "emoji-mart";
import PropTypes from 'prop-types';


const EmojiPicker = ({ onSelect }) => {
  return (
    <Picker
      set="facebook"
      enableFrequentEmojiSort
      onSelect={onSelect}
      theme="dark"
      showPreview={false}
      showSkinTones={false}
      emojiTooltip
      defaultSkin={1}
      color="#0F8FF3"
    />
  );
};

EmojiPicker.propTypes = {
  onSelect: PropTypes.any,
};

export default EmojiPicker;