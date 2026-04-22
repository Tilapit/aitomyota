export type TransactionalEmailPayload = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | string[];
  tags?: Array<{
    name: string;
    value: string;
  }>;
};

export type TransactionalEmailResult = {
  id: string;
};
