import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginRequest } from "../api/users"
import { Formik, Field, Form } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { FaVuejs } from "react-icons/fa";
import Loader from "../components/Loader";


const LoginPage = () => {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      queryClient.invalidateQueries("tweets")
      navigate("/")
      console.log("loginMutation success")
    },
    onError: (error) => {
      console.error(error)
    }
  })

  if(loginMutation.isLoading) return <Loader />

  return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className='m-5 p-10 bg-grey-3'>
          <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
            <div >
              <FaVuejs
                className="mx-auto text-sky-500 h-12 w-12"
              />
              <h2 className="mt-6 text-center text-3xl text-grey">
                Inicia sesión en Vacci 
  
              </h2>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => {
                loginMutation.mutate(values)
              }}
            >
              <Form>
                <Field id='email' name='email' placeholder='Email'
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />
  
                <Field type='password' id='password' name='password' placeholder='*******' 
                  className="
                  my-3
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  bg-transparent outline-neutral-800 
                  "
                />
                <button type='submit' className="bg-sky-400 my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                  Entrar
                </button>
  
              </Form>
            </Formik>
  
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to={'/register'}>
                  ¿No tienes una cuenta?
                  <span className='hover:text-sky-500 ml-2 transition-colors'>
                    ¡Regístrate aquí!
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;