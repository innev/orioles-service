'use client'

import { useTranslation } from 'react-i18next';

const AdminDashboardPage = ({ params }: { params: { locale: string } }) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('adminDashboard')}</h1>
    </div>
  );
}

export default AdminDashboardPage
