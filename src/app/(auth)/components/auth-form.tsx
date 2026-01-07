'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { loginSchema, signupSchema } from '@/lib/schemas';
import { login, signup } from '@/app/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === 'login';
  const schema = isLogin ? loginSchema : signupSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isLogin ? { email: '', password: '' } : { email: '', password: '', name: '' },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      if (isLogin) {
        await login(data as z.infer<typeof loginSchema>);
        toast({ title: 'Login Successful', description: "Welcome back!" });
      } else {
        await signup(data as z.infer<typeof signupSchema>);
        toast({ title: 'Signup Successful', description: 'Your account has been created.' });
      }
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {isLogin ? 'Enter your credentials to access your account.' : 'Create an account to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <Button variant="link" asChild className="p-1">
          <Link href={isLogin ? '/signup' : '/login'}>
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
