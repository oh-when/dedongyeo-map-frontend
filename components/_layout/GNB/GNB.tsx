import React, { useEffect, useState } from 'react';
import * as $ from './GNBView';
import GNBLink from './GNBLink';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';

const GNB: React.FC = () => {
  const [session, loading] = useSession();
  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (session) {
      setSignIn(true);
    }
  }, [session, loading]);

  return (
    <$.GNB>
      <$.GNBInner>
        {/* 임시 로그아웃 버튼 */}
        {signIn && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <button
              style={{
                cursor: 'pointer',
                border: '1px solid gray',
                borderRadius: '10px',
                width: '100%',
              }}
              onClick={() => signOut()}
            >
              logout
            </button>
          </div>
        )}

        <GNBLink href="/" />
        <GNBLink href="/course" />
        <GNBLink href="/setting" />
      </$.GNBInner>
    </$.GNB>
  );
};

export default GNB;
