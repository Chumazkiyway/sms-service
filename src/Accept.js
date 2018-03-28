import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Block extends React.Component {

            send() {
              alert("hi");
            };
            cancel() {
              alert("cancel");
            };
            render() {

              return (
                <div className="pos-center-block">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr className="active">
                          <th>Фамилия</th>
                          <th>Имя</th>
                          <th>Номер</th>
                          <th>Тип сообщения</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th >Волик</th>
                          <th>Сергей</th>
                          <th>0930685396</th>
                          <th>СМС</th>
                        </tr>
                        <tr>
                          <th>Волик</th>
                          <th>Сергей</th>
                          <th>0930685396</th>
                          <th>СМС</th>
                        </tr>
                        <tr>
                          <th>Волик</th>
                          <th>Сергей</th>
                          <th>0930685396</th>
                          <th>СМС</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <span>Количество смс сообщений: </span><br/>
                  <span>Количество viber сообщений: </span><br/>
                  <span> Цена отправки одного смс сообщения:  грн</span><br/>
                  <span> Цена отправки смс сообщений: грн</span><br/>
                  <Link to="/send"><button onClick={this.cancel} className="btn btn-danger my-btn-pos-1">Отменить</button></Link>
                  <Link to="/send"><button onClick={this.send} className="btn btn-success my-btn-pos-2">Отправить</button></Link>

                  
                </div>
              );
            }
        }

export default Block;
