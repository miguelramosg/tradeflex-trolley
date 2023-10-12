import React, { ReactElement, useEffect, useState } from 'react';
import { 
  getFirestore
} from 'firebase/firestore';
import { 
  FirestoreProvider, 
  useFirestore, 
  useFirebaseApp
} from 'reactfire';
import { 
  Col,
  Layout,
} from 'antd';
import StepsForm from './stepsForm';
import tradeflexLogo from './assets/tradeflex-logo.png'

import * as FirestoreService from './utilities/firebaseConfig'
import './App.scss';

const { Header, Footer, Sider, Content } = Layout;

export default function App(): ReactElement {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const stageTodo = localStorage.getItem('stageTodo');
  const [showToDo, setShowToDo] = useState(false);

  useEffect(() => {
    FirestoreService.authenticateAnonymously();
    if (stageTodo) {
      setShowToDo(stageTodo);
    }
  }, []);

  return (
    <>
    <FirestoreProvider sdk={firestoreInstance}>
    <Layout className="app-body">
      <Header className="app-header">
        <a href="https://tradeflex.com.au/">
          <img
           src={tradeflexLogo} 
           alt="tradeflex logo"
          />
        </a>
      </Header>
      <Content className="app-content">
        <Col xs={{ span: 20, offset: 2 }}>
        {showToDo ?
          
              <div>
                <h4>Things to do on levelSelected aa</h4>   
                
              </div>
          :
          <StepsForm changeStage={setShowToDo} />
        }
        </Col>
      </Content>
      <Footer>todos los derechos reservados</Footer>
    </Layout>
    </FirestoreProvider>
</>

  );
}

