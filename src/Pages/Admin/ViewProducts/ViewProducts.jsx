import React from 'react';
import Layout from '../Layout';
import './ViewProducts.css';
import { useFetchProducts } from '../hooks/useFetchProducts';
import Loader from '../../../Components/Loader';

const ViewProducts = () => {
    const {
        result,
        loading,
        error,
        page,
        setPage,
        totalPages,
        filters,
        handleFilter,
        resetFilters,
    } = useFetchProducts();

    const allViewed = result.reduce((acc, product) => acc + product.viewed, 0);

    return (
        <div className="view-products_container">
            <div className="panel">
                <div className="panel-header">
                    <h3 className="title">Cтатистика переглядів по товарам</h3>
                </div>

                <div className="panel-body">
                    <div className="categories">
                        <div className="category">
                            <span>Нові користувачі</span>
                            <span>1.897</span>
                        </div>
                        <div className="category">
                            <span>За цей місяць</span>
                            <span>127</span>
                        </div>
                        <div className="category">
                            <span>Всього переглядів</span>
                            <span>{allViewed}</span>
                        </div>
                    </div>

                    <div className="chart">

                        {loading ? <Loader size={7} center /> : (
                            <table className="table-active view-products_table-body">
                                <thead>
                                    <tr>
                                        <td>Назва</td>
                                        <td>Модель</td>
                                        <td>Перегляів</td>
                                        <td>Відсоток</td>
                                    </tr>
                                </thead>
                                <tbody className="view-products_table-body">
                                    {result.sort((a, b) => b.viewed - a.viewed).map((product) => (
                                        <tr key={product.product_id}>
                                            <td className="view-products_table-product-info">
                                                <img style={{ width: '100px', height: '100px' }} src={product.image} alt="prodyc-image" />
                                                <span className="view-products_table-product-name">{product.name}</span>
                                            </td>
                                            <td>
                                                {product.model}
                                            </td>
                                            <td>{product.viewed}</td>
                                            <td>{`${((product.viewed * 100) / allViewed).toFixed(2) }%`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout(ViewProducts);
