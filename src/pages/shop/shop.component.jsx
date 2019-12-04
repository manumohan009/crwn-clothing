import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from './../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from './../../redux/shop/shop.selectors';

import WithSpinner from './../../components/with-spinner/with-spinner.component';
import CollectionsOverview from './../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
  componentDidMount(){

    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => { // observable based call to firebase
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({loading: false});
    // })

  }

  render(){
    const { match, isFetchingCollections, isCollectionsLoaded } = this.props;
    return(
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render = { (props)=> <CollectionsOverviewWithSpinner isLoading={ isFetchingCollections } {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render = {(props) => <CollectionPageWithSpinner isLoading={ !isCollectionsLoaded } {...props} />} />
      </div>
  )}
}


const mapDispatchToProps = dispatch =>({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);