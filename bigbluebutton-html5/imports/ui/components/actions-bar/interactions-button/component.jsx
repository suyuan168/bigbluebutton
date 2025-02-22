import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import BBBMenu from '/imports/ui/components/common/menu/component';
import ReactionsBar from '/imports/ui/components/emoji-picker/reactions-bar/component';
import UserReactionService from '/imports/ui/components/user-reaction/service';
import UserListService from '/imports/ui/components/user-list/service';

import Styled from '../styles';

const InteractionsButton = (props) => {
  const {
    intl,
    actionsBarRef,
    userId,
    raiseHand,
    isMobile,
  } = props;

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const intlMessages = defineMessages({
    interactionsLabel: {
      id: 'app.actionsBar.interactions.interactions',
      description: 'interactions Label',
    },
  });

  const handleClose = () => {
    setShowEmojiPicker(false);
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  const handleReactionSelect = (reaction) => {
    UserReactionService.setUserReaction(reaction);
    handleClose();
  };

  const handleRaiseHandButtonClick = () => {
    UserListService.setUserRaiseHand(userId, !raiseHand);
    handleClose();
  };

  const renderReactionsBar = () => (
    <Styled.Wrapper>
      <ReactionsBar {...props} onReactionSelect={handleReactionSelect} onRaiseHand={handleRaiseHandButtonClick} />
    </Styled.Wrapper>
  );

  const customStyles = { top: '-1rem', borderRadius: '1.7rem' };

  return (
    <BBBMenu
      trigger={(
        <Styled.InteractionsDropdown>
          <Styled.RaiseHandButton
            data-test="InteractionsButton"
            icon="hand"
            label={intl.formatMessage(intlMessages.interactionsLabel)}
            description="Interactions"
            ghost={!showEmojiPicker}
            onKeyPress={() => {}}
            onClick={() => setShowEmojiPicker(true)}
            color={showEmojiPicker ? 'primary' : 'default'}
            hideLabel
            circle
            size="lg"
          />
        </Styled.InteractionsDropdown>
      )}
      renderOtherComponents={showEmojiPicker ? renderReactionsBar() : null}
      onCloseCallback={() => handleClose()}
      customAnchorEl={!isMobile ? actionsBarRef.current : null}
      customStyles={customStyles}
      open={showEmojiPicker}
      hasRoundedCorners
      overrideMobileStyles
      opts={{
        id: 'reactions-dropdown-menu',
        keepMounted: true,
        transitionDuration: 0,
        elevation: 3,
        getContentAnchorEl: null,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        transformOrigin: { vertical: 'bottom', horizontal: 'center' },
      }}
    />
  );
};

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  sidebarContentPanel: PropTypes.string.isRequired,
  layoutContextDispatch: PropTypes.func.isRequired,
};

InteractionsButton.propTypes = propTypes;

export default InteractionsButton;
