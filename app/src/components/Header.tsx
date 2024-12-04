// app/src/components/Header.tsx
export default function Header() {
  return (
    <header className='fixed top-0 w-full border-b bg-white'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='font-bold'>HealthBook</div>
        <nav className='flex items-center gap-4'>
          <a href='/auth' className='text-sm font-medium'>
            Provider Login
          </a>
          <button className='text-sm font-medium'>TR/EN</button>
        </nav>
      </div>
    </header>
  );
}
