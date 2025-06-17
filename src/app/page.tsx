import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CategoryAccordion } from '@/components/CategoryAccordion';
import { CustomAccountForm } from '@/components/CustomAccountForm';
import { categoriesData, accountsData, WHATSAPP_PHONE_NUMBER } from '@/data/mockData';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const unsoldAccounts = accountsData.filter(acc => !acc.isSold);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="hero" aria-labelledby="hero-heading" className="mb-12 text-center">
          <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-4">
            PanthStore
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encontre sua conta de League of Legends perfeita! Navegue por nossas categorias ou peça uma conta personalizada.
          </p>
        </section>

        <Separator className="my-12" />

        <section id="accounts-by-category" aria-labelledby="accounts-by-category-heading" className="mb-16">
          <h2 id="accounts-by-category-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-center mb-8 text-foreground">
            Contas Disponíveis por Categoria
          </h2>
          {categoriesData.length > 0 ? (
            <CategoryAccordion categories={categoriesData} accounts={unsoldAccounts} whatsAppPhoneNumber={WHATSAPP_PHONE_NUMBER} />
          ) : (
            <p className="text-center text-muted-foreground">Nenhuma categoria disponível no momento.</p>
          )}
        </section>
        
        <Separator className="my-16" />

        <section id="custom-account" aria-labelledby="custom-account-heading" className="pb-12 pt-8">
          <CustomAccountForm whatsAppPhoneNumber={WHATSAPP_PHONE_NUMBER} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
