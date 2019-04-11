import React from 'react';
import './LoadingSpinners.css';
import Loader from 'react-loader-spinner';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export const MainSpinner = () => (
  <div className="spinner">
    <Loader type="Oval" color="#dfe2e680" height={120} width={120} />
  </div>
);

export const SidebarSpinner = () => (
  <div className="spinner">
    <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
  </div>
);

export const GraphSpinner = () => (
  <div id="spinner" className="spinner">
    <Loader type="Grid" color="#879095" height={80} width={80} />
  </div>
);

export const ChartInfoSpinner = () => (
  <div id="spinner2" className="spinnerChartInfo">
    <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
  </div>
);

export const NoChartInfoModal = ({ toggleModal, modal, handleExternalComponentSubmit, graphFocus, coin1, coin2 }) => (
  <div>
    <Modal isOpen={modal} toggle={toggleModal} className={graphFocus === 1 ? 'graph1Modal' : 'graph2Modal'}>
      <ModalHeader toggle={toggleModal}>
        {'Whoops...'}
      </ModalHeader>
      <ModalBody>
        {graphFocus === 1 ? `There is no chart history available for ${coin1}!` : `There is no chart history available for ${coin2}!` }
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={(e) => {
            handleExternalComponentSubmit(e, 'BTC');
            toggleModal();
          }}
        >
          {'Go to BTC'}
        </Button>
        <Button
          onClick={() => {
            toggleModal();
          }
          }
        >
          {'Stay here'}
        </Button>
      </ModalFooter>
    </Modal>
  </div>
)