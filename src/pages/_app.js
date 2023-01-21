import 'tailwindcss/tailwind.css'
import '../../style/app.css'
import { Provider } from "jotai";
import { blockAtoms } from '@/lib/store';

export default function App({ Component, pageProps }) {
  const { initialState } = pageProps;

  return (
    <Provider initialValues={initialState && [[blockAtoms, initialState]]}>
      <Component {...pageProps} />
    </Provider>
  );
}
