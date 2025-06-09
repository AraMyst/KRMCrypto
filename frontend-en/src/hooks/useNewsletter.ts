// Hook que expõe estado e ação de subscribe do NewsletterContext
import { useNewsletter as useNewsletterContext } from '../contexts/NewsletterContext';

export default function useNewsletter() {
  return useNewsletterContext();
}
