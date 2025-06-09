// components/TermsModal.js
import React from 'react';
import './common.css';

const TermsModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{marginBottom:0, borderBottom: '1px solid #CFCFCF',color:'#000000de',width:'100%', padding:10, fontSize:16, textAlign:'center'}}>{title}</h3>
        <div className="modal-scroll">{content}</div>
        <button className="modal-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default TermsModal;
