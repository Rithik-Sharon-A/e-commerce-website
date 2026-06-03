"use client";

import { Suspense } from 'react'
import VerifyContent from './VerifyContent'

const Verify = () => {
  return (
    <Suspense fallback={<div></div>}>
      <VerifyContent />
    </Suspense>
  )
}

export default Verify
