
import { redirect } from 'next/navigation';
import { verifySession, logout } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminAccountsTab from './_components/AdminAccountsTab';
import AdminFaqsTab from './_components/AdminFaqsTab';
import AdminSettingsTab from './_components/AdminSettingsTab';
import AdminStorefrontTab from './_components/AdminStorefrontTab';
import { LayoutDashboard, LogOut, Settings, ShoppingBag, HelpCircle, Palette, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default async function AdminPage() {
  const session = await verifySession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-primary tracking-tight">Painel de Administração</h1>
        </div>
        <form action={logout}>
          <Button variant="outline" size="sm" className="flex items-center gap-1.5">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </form>
      </header>
      
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto mb-6 rounded-lg p-1 bg-muted shadow">
            <TabsTrigger value="accounts" className="py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
              <ShoppingBag className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              Contas/Serviços
            </TabsTrigger>
            <TabsTrigger value="faqs" className="py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
              <HelpCircle className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="storefront" className="py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
              <Palette className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="settings" className="py-2.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md transition-all">
              <Settings className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              Geral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="bg-card p-4 md:p-6 rounded-xl shadow-lg border">
            <AdminAccountsTab />
          </TabsContent>
          <TabsContent value="faqs" className="bg-card p-4 md:p-6 rounded-xl shadow-lg border">
            <AdminFaqsTab />
          </TabsContent>
          <TabsContent value="storefront" className="bg-card p-4 md:p-6 rounded-xl shadow-lg border">
            <AdminStorefrontTab />
          </TabsContent>
          <TabsContent value="settings" className="bg-card p-4 md:p-6 rounded-xl shadow-lg border">
            <AdminSettingsTab />
          </TabsContent>
        </Tabs>
      </main>
       <footer className="border-t bg-background py-4 px-6 mt-auto">
        <p className="text-xs text-center text-muted-foreground">
          PanthStore Admin Panel &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
