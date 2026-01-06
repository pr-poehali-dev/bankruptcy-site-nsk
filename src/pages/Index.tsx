import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [debtAmount, setDebtAmount] = useState(1000000);
  const [creditorsCount, setCreditorsCount] = useState(3);
  const [hasProperty, setHasProperty] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', date: '', time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen || isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isBookingOpen]);

  const calculatePrice = () => {
    let basePrice = 35000;
    if (debtAmount > 500000) basePrice += 15000;
    if (debtAmount > 1500000) basePrice += 20000;
    if (creditorsCount > 5) basePrice += 10000;
    if (hasProperty) basePrice += 25000;
    return basePrice.toLocaleString('ru-RU');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBookingOpen(false);
      setBookingForm({ name: '', phone: '', email: '', date: '', time: '' });
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-heading font-bold text-secondary">Банкрот и Точка</span>
            </div>
            <div className="hidden lg:flex gap-8">
              {['Процесс', 'Услуги', 'Кейсы', 'Команда', 'FAQ', 'Блог', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-foreground/70 hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button className="hidden sm:flex bg-primary hover:bg-primary/90" asChild>
                <a href="tel:88005505039">
                  <Icon name="Phone" size={18} className="mr-2" />
                  <span className="hidden md:inline">8 800 550 50 39</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-heading font-bold">Меню</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
              <nav className="space-y-4">
                {['Процесс', 'Услуги', 'Кейсы', 'Команда', 'FAQ', 'Блог', 'Контакты'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </nav>
              <div className="mt-8 space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }}>
                  <Icon name="Calendar" size={18} className="mr-2" />
                  Записаться на консультацию
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="tel:88005505039">
                    <Icon name="Phone" size={18} className="mr-2" />
                    8 800 550 50 39
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsBookingOpen(false)}></div>
          <Card className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Запись на консультацию</CardTitle>
                  <CardDescription>Выберите удобное время, и мы вам перезвоним</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsBookingOpen(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking-name">Ваше имя *</Label>
                    <Input
                      id="booking-name"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <Label htmlFor="booking-phone">Телефон *</Label>
                    <Input
                      id="booking-phone"
                      required
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="booking-email">Email</Label>
                  <Input
                    id="booking-email"
                    type="email"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    placeholder="ivan@example.com"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking-date">Предпочитаемая дата *</Label>
                    <Input
                      id="booking-date"
                      required
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="booking-time">Предпочитаемое время *</Label>
                    <Input
                      id="booking-time"
                      required
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="flex gap-3 mb-2">
                    <Icon name="Info" className="text-primary flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Консультация бесплатная</p>
                      <p className="text-foreground/70">Мы свяжемся с вами в указанное время и ответим на все вопросы о процедуре банкротства</p>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={20} className="mr-2" />
                      Записаться на консультацию
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                ✨ Новосибирск • Гарантируем результат
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                Со мной вы{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  под защитой закона
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 mb-8">
                Списание долгов через процедуру банкротства. Личная консультация и поддержка основателя. Без скрытых расходов.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8" onClick={() => scrollToSection('калькулятор')}>
                  Рассчитать стоимость
                  <Icon name="Calculator" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8" asChild>
                  <a href="https://t.me/poskotina_bfl" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" size={20} className="mr-2" />
                    <span className="hidden sm:inline">Telegram: @poskotina_bfl</span>
                    <span className="sm:hidden">Telegram</span>
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">500+</div>
                  <div className="text-xs sm:text-sm text-foreground/60">Успешных дел</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">100%</div>
                  <div className="text-xs sm:text-sm text-foreground/60">Гарантия результата</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">0₽</div>
                  <div className="text-xs sm:text-sm text-foreground/60">Скрытых платежей</div>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/90a9cc7f-ff16-449d-9751-2c621e231101/files/00ffaff6-eb2c-4554-bbd8-be3edee07ced.jpg"
                alt="Свобода от долгов"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'Award', title: 'Гарантируем результат', desc: 'Работаем до полного списания долгов' },
              { icon: 'Heart', title: 'С душой и заботой', desc: 'Личная поддержка на каждом этапе' },
              { icon: 'DollarSign', title: 'Без скрытых платежей', desc: 'Прозрачная стоимость с первого дня' },
            ].map((item, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="процесс" className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Этапы работы</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Как проходит процесс</h2>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/60 max-w-2xl mx-auto">
              Прозрачная процедура из 5 шагов — вы всегда знаете, на каком этапе находится ваше дело
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: 'FileSearch', title: 'Анализ', desc: 'Изучаем вашу ситуацию и документы', color: 'from-blue-500 to-cyan-500' },
              { icon: 'FileText', title: 'Документы', desc: 'Собираем и готовим пакет для суда', color: 'from-purple-500 to-pink-500' },
              { icon: 'Gavel', title: 'Подача в суд', desc: 'Подаем заявление и представляем интересы', color: 'from-orange-500 to-red-500' },
              { icon: 'Users', title: 'Процедура', desc: 'Работа с финансовым управляющим', color: 'from-green-500 to-emerald-500' },
              { icon: 'CheckCircle', title: 'Свобода', desc: 'Получаем решение о списании долгов', color: 'from-indigo-500 to-purple-500' },
            ].map((step, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`}></div>
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={step.icon} className="text-white" size={28} />
                  </div>
                  <div className="text-4xl font-bold text-foreground/10 absolute top-4 right-4">{index + 1}</div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="калькулятор" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-primary text-white">Калькулятор</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Рассчитайте стоимость</h2>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/60">
              Узнайте примерную стоимость процедуры банкротства за 30 секунд
            </p>
          </div>
          <Card className="p-8 shadow-2xl animate-scale-in">
            <div className="space-y-8">
              <div>
                <Label className="text-lg mb-4 block">Сумма долга: <span className="text-primary font-bold">{debtAmount.toLocaleString('ru-RU')} ₽</span></Label>
                <Slider
                  value={[debtAmount]}
                  onValueChange={(value) => setDebtAmount(value[0])}
                  min={100000}
                  max={5000000}
                  step={100000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-foreground/50">
                  <span>100 тыс ₽</span>
                  <span>5 млн ₽</span>
                </div>
              </div>

              <div>
                <Label className="text-lg mb-4 block">Количество кредиторов: <span className="text-primary font-bold">{creditorsCount}</span></Label>
                <Slider
                  value={[creditorsCount]}
                  onValueChange={(value) => setCreditorsCount(value[0])}
                  min={1}
                  max={15}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-foreground/50">
                  <span>1</span>
                  <span>15+</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <Label htmlFor="property" className="text-lg cursor-pointer">Есть имущество (квартира, авто)?</Label>
                <button
                  id="property"
                  onClick={() => setHasProperty(!hasProperty)}
                  className={`w-14 h-8 rounded-full transition-colors ${hasProperty ? 'bg-primary' : 'bg-gray-300'} relative`}
                >
                  <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${hasProperty ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-2xl text-white text-center">
                <div className="text-lg mb-2">Примерная стоимость услуги</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">{calculatePrice()} ₽</div>
                <p className="text-white/80 mb-6">Точная стоимость рассчитывается после консультации</p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Получить консультацию
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="услуги" className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Наши услуги</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Что мы предлагаем</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'FileCheck',
                title: 'Списание долгов (Банкротство)',
                desc: 'Полная процедура банкротства физических лиц по ФЗ №127',
                features: ['Полное сопровождение', 'Работа с судом', 'Защита имущества', 'Гарантия результата'],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: 'Building2',
                title: 'Внесудебное банкротство',
                desc: 'Упрощенная процедура через МФЦ для быстрого решения',
                features: ['Без суда', 'Быстрое оформление', 'Минимум документов', 'Доступная цена'],
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: 'RefreshCw',
                title: 'Реструктуризация долгов',
                desc: 'Восстановление платежеспособности через реструктуризацию',
                features: ['Пересмотр условий', 'Снижение платежей', 'План погашения', 'Сохранение кредитной истории'],
                gradient: 'from-orange-500 to-red-500'
              },
            ].map((service, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${service.gradient}`}></div>
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={service.icon} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="кейсы" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Истории успеха</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Реальные кейсы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Анна К.', debt: '2.3 млн ₽', result: 'Списано 100%', time: '5 месяцев', category: 'Кредиты' },
              { name: 'Михаил С.', debt: '4.8 млн ₽', result: 'Списано 100%', time: '7 месяцев', category: 'ИП + кредиты' },
              { name: 'Елена В.', debt: '1.5 млн ₽', result: 'Списано 100%', time: '6 месяцев', category: 'Микрозаймы' },
            ].map((caseItem, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                      {caseItem.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle>{caseItem.name}</CardTitle>
                      <Badge variant="outline">{caseItem.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Сумма долга:</span>
                      <span className="font-bold">{caseItem.debt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Результат:</span>
                      <span className="font-bold text-green-600">{caseItem.result}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Срок:</span>
                      <span className="font-bold">{caseItem.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="команда" className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Основатель</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Алина Поскотина</h2>
            <p className="text-xl text-foreground/60">Юрист по банкротству с личным подходом к каждому клиенту</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6">
                  <img
                    src="https://cdn.poehali.dev/projects/90a9cc7f-ff16-449d-9751-2c621e231101/files/96a536a0-e5f5-4d2f-88e8-3f8c766e9756.jpg"
                    alt="Алина Поскотина"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-heading font-bold mb-4">Личная консультация и поддержка</h3>
                  <p className="text-foreground/70 mb-6">
                    Я лично провожу консультации и сопровождаю каждое дело от начала до конца. 
                    Вы всегда можете связаться со мной напрямую и получить актуальную информацию о своем деле.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Send" className="text-primary" size={20} />
                      <span>Telegram: @poskotina_bfl</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" className="text-primary" size={20} />
                      <span>+7 906 906 37 34</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" className="text-primary" size={20} />
                      <span>bankrot-i-tochka@ya.ru</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'Кто может объявить себя банкротом?',
                a: 'Любой гражданин РФ с долгом от 500 000 рублей, который не может платить по обязательствам более 3 месяцев.'
              },
              {
                q: 'Сколько длится процедура банкротства?',
                a: 'В среднем 6-8 месяцев с момента подачи заявления до получения решения о списании долгов.'
              },
              {
                q: 'Можно ли сохранить квартиру при банкротстве?',
                a: 'Да, единственное жилье защищено законом и не может быть продано в рамках процедуры банкротства.'
              },
              {
                q: 'Что такое внесудебное банкротство через МФЦ?',
                a: 'Это упрощенная процедура банкротства для граждан с долгом от 50 до 500 тысяч рублей. Проходит без суда, быстрее и дешевле.'
              },
              {
                q: 'Какие гарантии вы даете?',
                a: 'Мы гарантируем результат и ведем дело до полного списания долгов. Все условия прописываем в договоре.'
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-lg font-medium hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="блог" className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Блог</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Полезные материалы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Как подготовиться к банкротству', date: '15 декабря 2024', category: 'Гайд' },
              { title: 'Топ-5 ошибок при банкротстве', date: '10 декабря 2024', category: 'Советы' },
              { title: 'Новые изменения в законе о банкротстве', date: '1 декабря 2024', category: 'Новости' },
            ].map((post, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl flex items-center justify-center">
                  <Icon name="BookOpen" size={64} className="text-primary/40" />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-foreground/50">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4">Контакты</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Свяжитесь с нами</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Адрес</div>
                  <div className="text-foreground/70">г. Новосибирск, ул. Кропоткина, 273</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Телефон</div>
                  <div className="text-foreground/70">8 800 550 50 39<br/>+7 906 906 37 34</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Email</div>
                  <div className="text-foreground/70">bankrot-i-tochka@ya.ru</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Send" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Telegram / WhatsApp</div>
                  <div className="text-foreground/70">@poskotina_bfl / @poskotinaa</div>
                </div>
              </div>
            </div>
            <Card className="p-8 animate-scale-in">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Записаться на консультацию</CardTitle>
                <CardDescription>Оставьте заявку, и мы свяжемся с вами в течение часа</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Отправить заявку
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Shield" className="text-white" size={24} />
                </div>
                <span className="text-2xl font-heading font-bold">Банкрот и Точка</span>
              </div>
              <p className="text-white/70">Профессиональное банкротство физических лиц в Новосибирске</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-white/70">
                <li>Банкротство физлиц</li>
                <li>Внесудебное банкротство</li>
                <li>Реструктуризация долгов</li>
                <li>Юридическая защита</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-white/70">
                <li>О нас</li>
                <li>Команда</li>
                <li>Кейсы</li>
                <li>Блог</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-white/70">
                <li>8 800 550 50 39</li>
                <li>+7 906 906 37 34</li>
                <li>bankrot-i-tochka@ya.ru</li>
                <li>ул. Кропоткина, 273</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50">
            <p>© 2024 Банкрот и Точка. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;