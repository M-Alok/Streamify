import { useState } from 'react';
import { Link } from 'react-router';
import { LockKeyhole, Mail, ShipWheelIcon, User } from 'lucide-react';

import useSignup from '../hooks/useSignup';

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signupMutation, isPending, error } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme='forest'>
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              Streamify
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}
          
          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div>
                <h2 className='text-xl font-semibold'>Create an account</h2>
                <p className='text-sm opacity-70'>
                  JoinStreamify and start your language learning adventure!
                </p>
              </div>

              <div className='space-y-3 mt-2'>
                {/* Fullname */}
                <div className='form-control w-full'>
                  <label className='label justify-start gap-2 pl-5'>
                    <User size={16} />
                    <span className='label-text'>Full name</span>
                  </label>
                  <input
                    type="text"
                    placeholder='ex: John Doe'
                    className='input input-bordered w-full'
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                    required
                  />
                </div>

                {/* Email */}
                <div className='form-control w-full'>
                  <label className='label justify-start gap-2 pl-5'>
                    <Mail size={16} />
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder='ex: john@gmail.com'
                    className='input input-bordered w-full'
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required
                  />
                </div>

                {/* Password */}
                <div className='form-control w-full'>
                  <label className='label justify-start gap-2 pl-5'>
                    <LockKeyhole size={16} />
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className='input input-bordered w-full'
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type="checkbox" className='checkbox checkbox-sm' />
                    <span className='text-xs leading-tight'>
                      I agree to the{' '}
                      <span className='text-primary hover:underline'>terms of service</span> and{' '}
                      <span className='text-primary hover:underline'>privacy policy</span>
                    </span>
                  </label>
                </div>

                <button type="submit" className='btn btn-primary w-full'>
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Signing up...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-primary hover:underline'>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/VideoCall.png" alt="Language connection illustration" className='w-full h-full' />
            </div>

            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Connect with language parterners worldwide</h2>
              <p className='opacity-70'>
                Practice conversations, make friends and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;