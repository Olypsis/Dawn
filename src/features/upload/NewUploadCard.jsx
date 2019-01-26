import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

// SubComponents
import UploadForm from './NewUploadForm';
import RadioButtonForm from '../../components/forms/RadioButtonForm';
import UploadCardHeaderContainer from './UploadCardHeaderContainer';

class UploadCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, message: '', publicKey: '', formType: '' };
  }

  async generateLink() {
    const { shh } = store.getState().whisper.status;
    try {
      // Generate random keyPairId
      const tempKeypairId = await shh.newKeyPair();
      // What we send through link
      const burnerpKey = await shh.getPrivateKey(tempKeypairId);
      // This is keypairId we generate using privKey
      const newKeyPairId = await shh.addPrivateKey(burnerpKey);
      // this is pubkey we send msg to
      const newPubKey = await shh.getPublicKey(newKeyPairId);

      console.log(
        'Burner account:',
        'keypairId:',
        newKeyPairId,
        'publicKey:',
        newPubKey,
        'privateKey',
        burnerpKey,
      );
      // Generate Link
      // FIXME Change to none localhost link
      const burnerLink =
        'https://shrouded-caverns-47686.herokuapp.com/#/?pkey=' + burnerpKey;
      console.log(burnerLink);
    } catch (err) {
      console.log(err);
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  changeForm = formType => {
    this.setState({ formType });
    console.log(formType);
  };

  render() {
    const { classes, sendStatusMessage, upload } = this.props;
    console.log('props', this.props);

    return (
      <Card className={classes.card}>
        {/*  Upload Header  */}
        <UploadCardHeaderContainer />
        <Divider />
        {/*  Upload Form  */}
        <CardContent>
          <UploadForm
            upload={upload}
            sendStatusMessage={sendStatusMessage}
            formtype={this.state.formType}
          >
            {/* Expand Button + Collapse - passed into form as children */}
            <CardActions className={classes.actions} disableActionSpacing>
              <div className={'app-form-actions'}>
                <button type={'submit'} className={'app-button primary'}>
                  Send to Peer
                </button>
              </div>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </UploadForm>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Divider />
              <RadioButtonForm changeForm={this.changeForm} />
              <Divider variant="middle" />
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    );
  }
}

UploadCard.propTypes = {
  classes: PropTypes.object.isRequired,
  sendStatusMessage: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired,
};

export default UploadCard;
