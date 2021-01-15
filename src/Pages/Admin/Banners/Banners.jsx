import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import Modal from 'Components/Modal';
import { ADD_METHOD, UPDATE_METHOD } from 'Constants';
import BannerForm from './BannerForm';
import Banner from './Banner';
import Layout from '../Layout';
import { useFetchAllBanners } from '../hooks/useFetchBanners';
import { usePostBanner } from '../hooks/usePostBanner';

const Banners = () => {
    const [show, setShow] = useState(false);
    const {
        register, handleSubmit, errors, setValue,
    } = useForm();
    const {
        loading, banners, setBanners, error,
    } = useFetchAllBanners();
    const toggleModal = () => setShow((a) => !a);
    const {
        loading: postBannerLoading,
        deleteLoading,
        handleSubmit: postBanner,
        deleteBanner,
    } = usePostBanner(toggleModal);

    useEffect(() => {
        if (typeof show === 'number') {
            const ban = banners.find((banner) => banner.banner_id === show);
            Object.keys(ban).forEach((key) => {
                if (key !== 'image') {
                    setValue(key, ban[key]);
                }
            });
        }
    }, [show]);

    const onRemove = (id) => {
        window.confirm('Удалить баннер?') && deleteBanner(id)
            .then(() => {
                setBanners(
                    (prevBanners) => prevBanners.filter(
                        (prevBanner) => prevBanner.banner_id !== id,
                    ),
                );
            })
            .catch(console.warn);
    };

    const onSubmit = (data) => {
        const type = typeof show === 'number' ? UPDATE_METHOD : ADD_METHOD;

        postBanner(data, show, type)
            .then((banner) => {
                if (type === UPDATE_METHOD) {
                    setBanners((prevBanners) => prevBanners.map((prevBanner) => {
                        if (prevBanner.banner_id === banner.banner_id) {
                            return banner;
                        }

                        return prevBanner;
                    }));
                } else {
                    setBanners((prevBanners) => [...prevBanners, banner]);
                }
                toggleModal();
            })
            .catch(console.warn);
    };

    const renderContent = () => {
        if (loading) {
            return <Loader size={7} center />;
        } if (!loading && error) {
            return <Alert type="warning" text={error.message} />;
        }

        return banners.map((banner) => (
            <div key={banner.banner_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <Banner
                    loading={deleteLoading}
                    setShow={setShow}
                    onRemove={onRemove}
                    {...banner}
                />
            </div>
        ));
    };

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1 className="h2">Баннеры</h1>
                {show && (
                    <Modal
                        show={show}
                        toggleModal={toggleModal}
                        loadingForm={postBannerLoading}
                        submit
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <BannerForm
                            register={register}
                            errors={errors}
                        />
                    </Modal>
                )}
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button
                        onClick={toggleModal}
                        type="button"
                        className="btn btn-primary px-3 py-1 mr-0"
                        style={{ fontSize: 22 }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout(Banners);
