class Bug {
  constructor(
    id,
    title,
    author,
    category,
    priority,
    description,
    status,
    createdAt
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.priority = priority;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }

  toObject() {
    // Convert instance properties to a plain object
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      category: this.category,
      priority: this.priority,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(doc) {
    const bugData = doc.data();
    return new Bug(
      bugData?.id,
      bugData?.title,
      bugData?.author,
      bugData?.category,
      bugData?.priority,
      bugData?.description,
      bugData?.status,
      bugData?.createdAt?.toDate() // Convert Firestore Timestamp to JavaScript Date
    );
  }
}

export default Bug;
