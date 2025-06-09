// src/services/paymentService.ts
import apiClient from '../utils/apiClient';
import { Subscription } from '../types';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'daily' | 'weekly' | 'monthly';
  description: string;
}

export interface CheckoutSession {
  sessionId: string;
  checkoutUrl: string;
}

/**
 * Busca os planos disponíveis (pode vir de backend ou ser definido estaticamente).
 */
export async function getPlans(): Promise<Plan[]> {
  // Se tiver um endpoint no backend, use:
  // const resp = await apiClient.get<Plan[]>('/api/plans');
  // return resp.data;

  // Exemplo estático — ajuste valores conforme seu modelo de negócio
  return [
    { id: 'daily',   name: 'Daily Analysis',   price: 9.99,  interval: 'daily',   description: 'Daily crypto price insights' },
    { id: 'weekly',  name: 'Weekly Analysis',  price: 19.99, interval: 'weekly',  description: 'Weekly crypto market overview' },
    { id: 'monthly', name: 'Monthly Analysis', price: 49.99, interval: 'monthly', description: 'In-depth monthly reports' },
  ];
}

/**
 * Retorna os dados da assinatura do usuário logado.
 */
export async function getSubscription(): Promise<Subscription> {
  const resp = await apiClient.get<Subscription>('/api/subscriptions/me');
  return resp.data;
}

/**
 * Inicia um processo de checkout para o plano selecionado.
 * Retorna a sessão de pagamento (ex.: URL da Coinbase Commerce).
 */
export async function createCheckoutSession(planId: string): Promise<CheckoutSession> {
  const resp = await apiClient.post<CheckoutSession>('/api/subscriptions', { plan: planId });
  return resp.data;
}

/**
 * Atualiza os dados de pagamento da assinatura ativa.
 * Por exemplo, altera cartão ou método de pagamento.
 */
export async function updatePaymentMethod(paymentData: any): Promise<void> {
  await apiClient.put('/api/subscriptions/payment-method', paymentData);
}

/**
 * Cancela a assinatura atual do usuário.
 */
export async function cancelSubscription(): Promise<void> {
  await apiClient.delete('/api/subscriptions/me');
}
