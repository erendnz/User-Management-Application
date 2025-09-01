import { Form, InputNumber, Select, Radio, Switch, Button, Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import './index.scss';

const { Option } = Select;

const limitSchema = z.object({
  limitPeriod: z.enum(['daily', 'weekly', 'monthly']),
  limitType: z.enum(['bet', 'deposit']),
  limitValue: z.number().positive({ message: 'Input positive number' }),
  limitValueType: z.enum(['percent', 'amount']),
  status: z.boolean(),
});

type LimitFormData = z.infer<typeof limitSchema>;

const AddLimitForm = ({ onAdd }: { onAdd: (newLimit: any) => void }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<LimitFormData>({
    resolver: zodResolver(limitSchema),
    defaultValues: {
      limitPeriod: 'daily',
      limitType: 'bet',
      limitValue: 0,
      limitValueType: 'amount',
      status: true,
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data: LimitFormData) => {
    setSubmitting(true);
    const newLimit = {
      ...data,
      id: uuidv4(),
      created: new Date().toISOString(),
    };
    onAdd(newLimit);
    reset();
    setSubmitting(false);
  };

  return (
    <Card className="add-limit-form">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="form-row">
          <Form.Item label="Limit Period">
            <Select
              defaultValue="daily"
              onChange={value => setValue('limitPeriod', value as 'daily' | 'weekly' | 'monthly')}
            >
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Limit Type">
            <Select
              defaultValue="bet"
              onChange={value => setValue('limitType', value as 'bet' | 'deposit')}
            >
              <Option value="bet">Bet</Option>
              <Option value="deposit">Deposit</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Limit Value"
            help={errors.limitValue?.message}
            validateStatus={errors.limitValue ? 'error' : ''}
            style={{ width: '100%' }}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              onChange={value => setValue('limitValue', value || 0)}
            />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item label="Limit Value Type">
            <Radio.Group
              defaultValue="amount"
              onChange={e => setValue('limitValueType', e.target.value)}
            >
              <Radio value="amount">Amount</Radio>
              <Radio value="percent">Percent</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Status">
            <Switch defaultChecked onChange={checked => setValue('status', checked)} />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddLimitForm;
