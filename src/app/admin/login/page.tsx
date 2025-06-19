
import { login } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { redirect } from 'next/navigation';
import { verifySession } from '@/app/admin/actions';

export default async function LoginPage() {
  const session = await verifySession();
  if (session) {
    redirect('/admin');
  }
  
  // Este estado e função de manipulação de erro são para feedback no cliente,
  // mas a action 'login' já retorna um objeto com 'error' que precisaria ser
  // tratado se quiséssemos exibir mensagens de erro sem recarregar a página.
  // Para simplificar, o redirecionamento acontece no servidor.

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
           <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4 shadow-md">
             <LogIn className="h-8 w-8" />
           </div>
          <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
          <CardDescription className="text-muted-foreground">Acesse o painel de controle da sua loja.</CardDescription>
        </CardHeader>
        {/* 
          Para exibir mensagens de erro da action 'login', precisaríamos de um useFormState 
          ou de um componente cliente que chame a action e gerencie o estado do erro.
          A action 'login' já retorna { error: '...' } em caso de falha.
        */}
        <form action={login}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Usuário</Label>
              <Input id="username" name="username" type="text" placeholder="seu_usuario" required 
                     className="bg-input border-border focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <Input id="password" name="password" type="password" placeholder="********" required 
                     className="bg-input border-border focus:ring-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
